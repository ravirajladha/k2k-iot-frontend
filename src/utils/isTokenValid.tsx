import {jwtDecode} from 'jwt-decode';

interface DecodedToken {
    exp: number;
}

export const isTokenValid = (token: string | null): boolean => {
    if (!token) return false;
    try {
        const decoded: DecodedToken = jwtDecode(token);
        return decoded.exp * 1000 > Date.now(); // Token validity check
    } catch {
        return false;
    }
};
