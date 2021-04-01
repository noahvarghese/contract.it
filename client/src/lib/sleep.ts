export const sleep = (timeout: number): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
};
