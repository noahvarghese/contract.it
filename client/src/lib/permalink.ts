const permalink = process.env.NODE_ENV === "development" ? "http://localhost:4000" : "contract_it.noahvarghese.me";
export default permalink;

export const statusApiLink = `${permalink}/api/statuses`;

export const statusImageLink = (image: string): string => `${permalink}/assets/img/statuses/${image}`;