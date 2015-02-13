Set WshShell = WScript.CreateObject("WScript.Shell")
WshShell.AppActivate "Windows Media Player"
WScript.Sleep 3000
 WshShell.SendKeys Wscript.Arguments.Item(0)