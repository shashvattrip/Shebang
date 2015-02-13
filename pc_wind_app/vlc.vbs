Set WshShell = WScript.CreateObject("WScript.Shell")
WshShell.AppActivate "VLC Media Player"
WScript.Sleep 3000
 WshShell.SendKeys Wscript.Arguments.Item(0)