export class DateUtil {
  static defaultLocale = 'en-US';
  static defaultFormatOptions = {
    dateStyle: 'medium',
    timeStyle: 'short'
  };
  static formatDateString(
    dateString,
    locale = DateUtil.defaultLocale,
    formatOptions = DateUtil.defaultFormatOptions
  ) {
    if (!dateString) return dateString;
    const date = new Date(dateString);
    // @ts-ignore
    return date.toLocaleString(locale, formatOptions);
  }
}
