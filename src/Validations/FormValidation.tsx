export const signupValidation = (name: string, value: string) => {
    switch (name) {
        case 'name':
            if (value.length === 0) return 'Name is required';
            return '';
        case 'email':
            if (!value.length) return 'Email is required';
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Invalid email format';
            return '';
        case 'password':
            if (value.length < 6) return 'Password must be at least 6 characters';
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/;
            if (!value.match(passwordRegex))
                return "Password must be 8-15 characters, include an uppercase, a lowercase, a number, and a special character.";
            return '';
        case 'confirmPassword':
             if (value.trim().length === 0) return "Confirm Password is required";
            return "";
        case 'accountType':
            if (!['APPLICANT', 'EMPLOYER'].includes(value)) return 'Invalid account type';
            return '';
        default:
            return '';
    }
};

export const loginValidation = (name: string, value: string) => {
    switch (name) {
        case 'email':
            if (!value.length) return 'Email is required';
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Invalid email format';
            return '';
        case 'password':
            if (!value.length) return 'Password is required';
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/;
            if (!value.match(passwordRegex))
                return "Password must be 8-15 characters, include an uppercase, a lowercase, a number, and a special character.";
          
            return '';
        default:
            return '';
    }
};