import StringUtil from '@cassielrattes/string-util';

const availableFormats = {
    'dd-mm-yyyy': '$<day>-$<month>-$<year>',
    'yyyy-mm-dd': '$<year>-$<month>-$<day>',
    'dd/mm/yyyy': '$<day>/$<month>/$<year>',
    'yyyy/mm/dd': '$<year>/$<month>/$<day>'

};

const yymmdd = /(?<year>\d{4}).(?<month>\d{2}).(?<day>\d{2})/g;
const ddmmyy = /(?<day>\d{2}).(?<month>\d{2}).(?<year>\d{4})/g;

const stringToDateExps = {
    'dd-mm-yyyy': ddmmyy,
    'yyyy-mm-dd': ddmmyy,
    'dd/mm/yyyy': yymmdd,
    'yyyy/mm/dd': yymmdd
};

export default class DateUtil {
    static formatDate(date, format) {
        if (!Object.keys(availableFormats).includes(format)) {
            return { error: `the format ${format} is not available yet :( ` };
        };

        const exp = availableFormats[format];
        const [result] = date.toISOString().match(yymmdd);

        return result.replace(yymmdd, exp);
    }

    static formatString(dateString, currentFormat, expectedFormat) {
        if (StringUtil.isEmpty(dateString)) {
            return { error: 'your text is empty' };
        }

        if (!Object.keys(availableFormats).includes(currentFormat)) {
            return { error: `the format ${currentFormat} is not available yet` };
        }

        if (!Object.keys(availableFormats).includes(expectedFormat)) {
            return { error: `the format ${expectedFormat} is not available yet` };
        }

        const toDateExp = stringToDateExps[currentFormat];

        const dateStringInIso = StringUtil.removeEmptySpaces(dateString)
            .replace(toDateExp, '$<year>-$<month>-$<day>');

        const finalDate = new Date(dateStringInIso);

        return this.formatDate(finalDate, expectedFormat);
    };
}
