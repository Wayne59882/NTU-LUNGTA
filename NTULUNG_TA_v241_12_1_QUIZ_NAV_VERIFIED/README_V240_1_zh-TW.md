# v240.1 Node PATH deployment fix

v240 在 server 的 acceptance check 執行 `node --check` 前沒有先把既有的
`/path/to/workdir/node-v22/bin` 加入 PATH，因此 interactive SSH shell 會出現
`node: command not found`，deployment 在 preflight 階段即停止。

v240.1 只修正 deployment bootstrap：

1. 先使用目前 PATH 內的 Node；
2. 若找不到，依序檢查 `/path/to/workdir/node-v22/bin/node` 與 `$HOME/node-v22/bin/node`；
3. 找到後 export PATH，再執行原本完整 v240 acceptance/deployment；
4. 若真的沒有 Node，會在改動 running service 前停止。

網站功能、3-model UI、site metrics、Reference Textbook、RAG、benchmark、feedback、
production inference 與 v240 相同，沒有另外改動。
