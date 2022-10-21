export default class StringUtil {
    static removeEmptySpaces(string) {
        return string.replace(/\s/g, "");
    }


    static isEmpty(string) {
        return string.length === 0;
    }
}