// create this class for the feedbackform which we are created in contactcomponent:

export class Feedback {
    firstname: string;
    lastname: string;
    telnum: number;
    email: string;
    agree: boolean;
    contacttype: string;
    message: string;
};

// create array of contacttype which we are used in select options in the form:
export const ContactType = ['None', 'Tel', 'Email'];