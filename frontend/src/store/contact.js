import {create} from 'zustand'

export const useContactStore = create((set) => ({
    contact: [],
    setContact: (contact)=> set({contact}),
    createContact: async (newContact) => {
        if(!newContact.name || !newContact.email || !newContact.phone){
            return {
                success: false,
                message: 'Please fill in all fields'
            }
        }
        const token = localStorage.getItem('token');
        const res = await fetch('/api/contacts/',{
            method: 'POST',
            headers:{
                'Content-Type': 'Application/JSON',
                'Authorization':   `Bearer ${token}`
            },
            body: JSON.stringify(newContact)
        })
        const data = await res.json();
        if(!data || !data.user_id) {
            localStorage.setItem('token', '');
            return {
                success: false,
                message: 'Contact couldnt be added. Try again later.'
            };
        } else {
            set((state)=>({contact: [...state.contact,{id: data._id, name :data.name,email: data.email, phone:data.phone}]}))
        }
        return {
            success:true,
            message: 'Contact added successfully'
        }
    },
    fetchContacts: async () =>{
        const token = localStorage.getItem('token');
        const response = await fetch('/api/contacts/',{
            method: 'GET',
            headers:{
                'Content-Type': 'Application/JSON',
                'Authorization':   `Bearer ${token}`
            }
        });
        const data = await response.json();
        set({contact: data});
        console.log(data);
        if(data.title) {
            localStorage.setItem('token', '');
            localStorage.setItem('userName', '');
            localStorage.setItem('email', '');
        }
    },
    updateContact: async (data, id) => {
        const token = localStorage.getItem('token');
        const response = await fetch(`/api/contacts/${id}`,{
            method: 'PUT',
            headers:{
                'Content-Type': 'Application/JSON',
                'Authorization':   `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        const finalresp = await response.json();
        if(finalresp._id) {
            return {
                success: true
            };
        } else {
            return {
                success: false
            }
        }
    },
    deleteContact: async (id) => {
        const token = localStorage.getItem('token');
        const delResponse = await fetch(`/api/contacts/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'Application/JSON',
                'Authorization':   `Bearer ${token}`
            }
        });
        const deleteResp = await delResponse.json();
        if(deleteResp._id) {
            return {
                success: true
            };
        } else {
            return {
                success: false
            };
        }
    }
}));
