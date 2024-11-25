import moment from 'moment';

// Function to format a date into "DD/MM/YYYY"
export const dateFormat = (date: string | Date): string => {
    return moment(date).format('DD/MM/YYYY');
};
