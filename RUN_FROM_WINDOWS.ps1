param([string]$ZipPath)
$ErrorActionPreference = 'Stop'
if (!$ZipPath) {
    $zip = Get-ChildItem -LiteralPath (Join-Path $env:USERPROFILE 'Downloads') `
        -Filter 'LUNGTA_COMPLETE_V241_12_5_QA_FIX_R11_20261028*.zip' -File |
        Sort-Object LastWriteTime -Descending | Select-Object -First 1
    if (!$zip) { throw 'Keep the R11 COMPLETE ZIP in Downloads, or pass -ZipPath with its full path.' }
    $ZipPath = $zip.FullName
}
$ZipPath = (Resolve-Path -LiteralPath $ZipPath).Path
$archiveHash = (Get-FileHash -LiteralPath $ZipPath -Algorithm SHA256).Hash.ToLowerInvariant()
$entry = Join-Path $PSScriptRoot 'DEPLOY_FROM_WINDOWS.ps1'
if (!(Test-Path -LiteralPath $entry -PathType Leaf)) { throw 'Extract the complete ZIP before running this launcher.' }
& ([scriptblock]::Create([IO.File]::ReadAllText($entry))) `
    -ZipPath $ZipPath -ExpectedArchive $archiveHash
