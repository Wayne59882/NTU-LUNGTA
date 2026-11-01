param([string]$ZipPath,[string]$RemoteArchivePath,[Parameter(Mandatory=$true)][string]$ExpectedArchive)
& {
    $ErrorActionPreference = 'Stop'
    [Net.ServicePointManager]::SecurityProtocol = [Net.ServicePointManager]::SecurityProtocol -bor [Net.SecurityProtocolType]::Tls12
    $server = 'USER@YOUR_SERVER'
    $expectedBuild = 'v241.12.5-full-answer-voice'
    if ($ExpectedArchive -notmatch '^[a-f0-9]{64}$') { throw 'Missing verified COMPLETE ZIP digest.' }
    if ($RemoteArchivePath) {
        if ($ZipPath -or $RemoteArchivePath -notmatch '^/path/to/workdir/lungta_repaired_vqR5_[a-f0-9]{12}\.zip$') { throw 'Invalid verified server archive path.' }
    } else {
        if (!$ZipPath -or !(Test-Path -LiteralPath $ZipPath -PathType Leaf)) { throw 'Missing COMPLETE ZIP.' }
        if ((Get-FileHash -LiteralPath $ZipPath -Algorithm SHA256).Hash -ne $ExpectedArchive) { throw 'Complete ZIP verification failed. Nothing was uploaded.' }
    }
    $expectedModel = 'v241.12.9-VQ-hopkins-region-20261010'
    $publicBase = 'https://lungta.twchu.workers.dev'
    $knownOrigin = 'https://stability-biotechnology-reporting-zone.trycloudflare.com'
    $agent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36 LungtaDeployVerifier/20261010R5'
    $headers = @{ 'Cache-Control' = 'no-cache' }
    $tag = 'vqR5_' + [Guid]::NewGuid().ToString('N').Substring(0,12)
    $remoteZip = "/path/to/workdir/lungta_upload_$tag.zip"
    $bootstrap = "/path/to/workdir/lungta_bootstrap_$tag"
    $remoteRunner = "$bootstrap/DEPLOY_COMPLETE.sh"
    $dnsMap = @{}
    foreach ($dnsHost in @('api.cloudflare.com', 'dash.cloudflare.com', 'registry.npmjs.org')) {
        try {
            $dnsTask = [Net.Dns]::GetHostAddressesAsync($dnsHost)
            if ($dnsTask.Wait(5000)) {
                $ipv4 = @($dnsTask.Result | Where-Object { $_.AddressFamily -eq [Net.Sockets.AddressFamily]::InterNetwork } | ForEach-Object { $_.ToString() } | Select-Object -First 2)
                if ($ipv4.Count -gt 0) { $dnsMap[$dnsHost] = $ipv4 }
            }
        } catch { Write-Host "[DNS] Using the server resolver for $dnsHost." }
    }
    $dns64 = [Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes((ConvertTo-Json -InputObject $dnsMap -Depth 4 -Compress)))
    $reuseCommand = ''
    if ($RemoteArchivePath) {
        Write-Host '[1/3] Verify the repaired COMPLETE ZIP already on the server; check LOCAL services.'
        $reuseCommand = "printf '%s  %s\n' '$ExpectedArchive' '$RemoteArchivePath' | sha256sum -c && cp -n '$RemoteArchivePath' '$remoteZip' && "
    } else {
        Write-Host '[1/3] Upload and verify this new COMPLETE ZIP; check LOCAL services.'
        & scp $ZipPath "${server}:$remoteZip"
        if ($LASTEXITCODE -ne 0) { throw 'Upload failed. Existing app was not updated.' }
    }
    $command = "printf '%s  %s\n' '$ExpectedArchive' '$remoteZip' | sha256sum -c && mkdir '$bootstrap' && unzip -q '$remoteZip' DEPLOY_COMPLETE.sh -d '$bootstrap' && bash '$remoteRunner' prepare '$tag' '$dns64' '$knownOrigin' '' '$ExpectedArchive'"
    & ssh -T -o ConnectTimeout=20 -o ServerAliveInterval=30 -o ServerAliveCountMax=6 $server ($reuseCommand + $command) | Tee-Object -Variable prepareOutput
    if ($LASTEXITCODE -ne 0) { throw 'Server preparation failed. Keep the actual LOCAL check output above. No application files were updated.' }
    $marker = @($prepareOutput | Where-Object { [string]$_ -match '^LUNGTA_PREPARED=' } | Select-Object -Last 1)
    if ($marker.Count -ne 1) { throw 'Preparation receipt was not returned.' }
    $prepared = ConvertFrom-Json -InputObject ([Text.Encoding]::UTF8.GetString([Convert]::FromBase64String(([string]$marker[0]).Substring(16))))
    if ($prepared.tag -ne $tag -or $prepared.build -ne $expectedBuild -or $prepared.model_revision -ne $expectedModel) { throw 'Unexpected preparation receipt.' }

    Write-Host '[2/3] Verify the current tunnel from WINDOWS, then publish the COMPLETE release.'
    $selectedOrigin = $null
    foreach ($candidate in @($prepared.origins)) {
        if ([string]$candidate -notmatch '^https://[-a-z0-9]+\.trycloudflare\.(com|app)$') { continue }
        for ($attempt = 1; $attempt -le 3; $attempt++) {
            try {
                $health = Invoke-RestMethod -Uri "$candidate/api/reference/health" -Headers $headers -UserAgent $agent -TimeoutSec 15
                if ($health.ok -eq $true -and [string]$health.build -eq $expectedBuild) { $selectedOrigin = [string]$candidate; break }
                Write-Host ('[TUNNEL] Build/health mismatch: ' + $candidate)
            } catch { Write-Host ('[TUNNEL] ' + $candidate + ' - ' + $_.Exception.Message) }
            if ($attempt -lt 3) { Start-Sleep -Seconds 2 }
        }
        if ($selectedOrigin) { break }
    }
    if (!$selectedOrigin) {
        Write-Host '[TUNNEL] Local services passed. Starting one fresh tunnel and verifying from Windows.'
        & ssh -T -o ConnectTimeout=20 -o ServerAliveInterval=30 -o ServerAliveCountMax=6 $server "bash '$remoteRunner' renew-tunnel '$tag' '$dns64' '' '' '$ExpectedArchive'" | Tee-Object -Variable recoveryOutput
        if ($LASTEXITCODE -ne 0) { throw 'Tunnel creation failed. Keep the actual tunnel error; application files and Worker settings were not updated.' }
        $marker = @($recoveryOutput | Where-Object { [string]$_ -match '^LUNGTA_PREPARED=' } | Select-Object -Last 1)
        if ($marker.Count -ne 1) { throw 'Tunnel recovery receipt missing.' }
        $prepared = ConvertFrom-Json -InputObject ([Text.Encoding]::UTF8.GetString([Convert]::FromBase64String(([string]$marker[0]).Substring(16))))
        if ($prepared.tag -ne $tag -or $prepared.build -ne $expectedBuild -or $prepared.model_revision -ne $expectedModel) { throw 'Unexpected tunnel recovery receipt.' }
        foreach ($candidate in @($prepared.origins)) {
            if ([string]$candidate -notmatch '^https://[-a-z0-9]+\.trycloudflare\.(com|app)$') { continue }
            for ($attempt = 1; $attempt -le 3; $attempt++) {
                try {
                    $health = Invoke-RestMethod -Uri "$candidate/api/reference/health" -Headers $headers -UserAgent $agent -TimeoutSec 15
                    if ($health.ok -eq $true -and [string]$health.build -eq $expectedBuild) { $selectedOrigin = [string]$candidate; break }
                } catch { Write-Host ('[NEW TUNNEL] ' + $_.Exception.Message) }
                if ($attempt -lt 3) { Start-Sleep -Seconds 2 }
            }
            if ($selectedOrigin) { break }
        }
    }
    if (!$selectedOrigin) { throw 'LOCAL services passed, but WINDOWS could not reach a healthy HTTPS tunnel. Application files and Worker settings were not updated.' }
    Write-Host ('[TUNNEL VERIFIED] ' + $selectedOrigin)
    & ssh -T -o ConnectTimeout=20 -o ServerAliveInterval=30 -o ServerAliveCountMax=6 $server "bash '$remoteRunner' publish '$tag' '$dns64' '$selectedOrigin' '$expectedBuild' '$ExpectedArchive'" | Tee-Object -Variable publishOutput
    if ($LASTEXITCODE -ne 0) { throw 'Publishing did not complete. Keep the server error and backup path above.' }
    $marker = @($publishOutput | Where-Object { [string]$_ -match '^LUNGTA_PUBLISHED=' } | Select-Object -Last 1)
    if ($marker.Count -ne 1) { throw 'Publication receipt was not returned; public verification has not passed.' }
    $receipt = ConvertFrom-Json -InputObject ([Text.Encoding]::UTF8.GetString([Convert]::FromBase64String(([string]$marker[0]).Substring(17))))
    if ($receipt.tag -ne $tag -or $receipt.build -ne $expectedBuild -or $receipt.published -ne $true -or $receipt.origin -ne $selectedOrigin -or $receipt.archive_sha256 -ne $expectedArchive -or $receipt.files.Count -ne 12 -or $receipt.complete_release_files -ne 503 -or $receipt.model_revision -ne $expectedModel) { throw 'Unexpected publication receipt.' }

    Write-Host '[3/3] Verify public HTML/JS bytes and the final API from WINDOWS.'
    $localDir = Join-Path $env:TEMP ('lungta_verify_' + $tag)
    New-Item -ItemType Directory -Path $localDir | Out-Null
    try {
        foreach ($item in $receipt.files) {
            if ($item.url_path -notmatch '^/(kb|reference)/(js/(05_recognition_stop_on_submit|25_v105_resume_after_question_mouth_sync|29_v153_course_aligned_student_results|35_hopkins_reference_lung_physiology|55_v241_course_adaptive_ta)\.js)?$' -or $item.sha256 -notmatch '^[a-f0-9]{64}$') { throw 'Unexpected verification path or hash.' }
            $download = Join-Path $localDir 'public_file.bin'
            $matched = $false
            for ($attempt = 1; $attempt -le 3; $attempt++) {
                try {
                    Invoke-WebRequest -UseBasicParsing -Uri ($publicBase + $item.url_path + "?verify=$tag-$attempt") -Headers $headers -UserAgent $agent -TimeoutSec 25 -OutFile $download | Out-Null
                    $matched = (Get-FileHash -LiteralPath $download -Algorithm SHA256).Hash -eq $item.sha256
                } catch { Write-Host ('[PUBLIC FILE] ' + $_.Exception.Message); $matched = $false }
                if ($matched) { break }
                if ($attempt -lt 3) { Start-Sleep -Seconds 2 }
            }
            if (!$matched) { throw ('Published, but exact public file verification failed: ' + $item.url_path + '. Keep the backup.') }
            Write-Host ('[VERIFIED] ' + $item.url_path)
        }
        $apiOK = $false
        for ($attempt = 1; $attempt -le 3; $attempt++) {
            try {
                $health = Invoke-RestMethod -Uri "$publicBase/api/reference/health" -Headers $headers -UserAgent $agent -TimeoutSec 25
                $apiOK = $health.ok -eq $true -and [string]$health.build -eq $expectedBuild
            } catch { Write-Host ('[PUBLIC API] ' + $_.Exception.Message); $apiOK = $false }
            if ($apiOK) { break }
            if ($attempt -lt 3) { Start-Sleep -Seconds 2 }
        }
        if (!$apiOK) { throw 'Published, but final public API verification failed. Keep the server backup.' }
        Write-Host '[FULL DEPLOY VERIFIED] R9 voice-recording fix + teacher V/Q COMPLETE release, public HTML/JS bytes, tunnel and API routing passed.'
        Write-Host ('[BACKUP] ' + $receipt.backup_path)
        Start-Process "$publicBase/reference/?voicefix=$tag"
    } finally {
        if (Test-Path -LiteralPath $localDir) { Remove-Item -LiteralPath $localDir -Recurse -Force }
    }
}
