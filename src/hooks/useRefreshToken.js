import axios from '../Controllers/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { auth,setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.get('/api/refresh', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + auth.accessToken
            },
            withCredentials: true
        });
        setAuth(prev => {
            console.log(JSON.stringify(prev));
            console.log('inside use refresh token',response.data.accessToken);
            return {
                ...prev,
                roles: response.data.roles,
                accessToken: response.data.accessToken
            }
        });
        return response.data.accessToken;
    }
    return refresh;
};

export default useRefreshToken;
