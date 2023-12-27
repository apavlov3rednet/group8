class Loc {
    static getMessage(str, repl = []) {
        return (MESS[str]) ? MESS[str] : str;
    }
}