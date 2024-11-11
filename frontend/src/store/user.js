import {create} from 'zustand';

export const useUserStore = create((set)=>({
    token: null,
    isAuthenticated: !!localStorage.getItem('token'),
    user: {userName: localStorage.getItem('userName'), email: localStorage.getItem('email')},
    setUser: (user) => set({user}),
    registrationStatus: false,
    login: async (email, password) => {
        try{
            const resp = await fetch('/api/user/login',{
                method: "POST",
                headers:{
                    'Content-Type': 'Application/JSON'
                },
                body:JSON.stringify({
                    email: email,
                    password: password
                })
            });
           // console.log(resp);
            const data = await resp.json();
          //  console.log("login response"+ data);
            if(data && data.accessToken) {
                const accessToken = data.accessToken;
                localStorage.setItem('token', data.accessToken);
                set(() => ({
                    token: accessToken,
                    isAuthenticated: true,
                  }));
                return {
                    success: true
                }
            } else {
                set({isAuthenticated:false})
                localStorage.setItem('token', '');
                localStorage.setItem('userName', '');
                localStorage.setItem('email', '');
                return {
                    success: false
                }
            }
        } catch(e){
            console.error('Login failed:', e);
            localStorage.setItem('token', '');
            localStorage.setItem('userName', '');
            localStorage.setItem('email', '');
        }
    },
    register : async (reqData) => {
        try {
            const response = await fetch('/api/user/register', {
                method: "POST",
                headers:{
                    'Content-Type': 'Application/JSON'
                },
                body:JSON.stringify({
                    userName: reqData.userName,
                    email: reqData.email,
                    password: reqData.password
                })
            });
            const data = await response.json();
           // console.log("registration response"+ data);
            if(data.id) {
                set({
                    registrationStatus: true
                });
                return {
                    success: true
                };
            } else {
                return {
                    success: false
                };
            }

        } catch(e) {
            console.error('Registration failed:', e);
        }
    },
    logout: ()=>{
        set({isAuthenticated:false});
        set({token:null});
        set({user: {}});
    },
    getUserInfo: async(token)=> {
        try {
            const result = await fetch('/api/user/current', {
                method: 'GET',
                headers: {
                    'Content-Type': 'Application/JSON',
                    'Authorization':   `Bearer ${token}`
                }
            });
            const userInfo = await result.json();
            if(userInfo.userName) {
                set((state) => ({
                    user: {
                        ...state.user,
                        userName: userInfo.userName,
                        email: userInfo.userName
                    }
                }));
                localStorage.setItem('userName', userInfo.userName);
                localStorage.setItem('email', userInfo.email);
                return {
                    success: true
                }
            } else {
                set((state) => ({
                    user: {
                        ...state.user,
                        userName: '',
                        email: ''
                    }
                }));
                return {
                    success: false
                }
            }
        } catch (e) {
            console.log("User info cannot be fetched"+e);
        }
    }
}));