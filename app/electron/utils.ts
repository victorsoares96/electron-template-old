export class Utils {
  public static isDev(): boolean {
    const isDev = process.env.NODE_ENV === 'development';
    return isDev;
  }

  public static isProd(): boolean {
    const isProd = process.env.NODE_ENV === 'production';
    return isProd;
  }
}
