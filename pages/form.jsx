import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
const Form = () => {
    const inputForm = [
        {
            id: 1,
            txt: 'First Name',
            htmlfor: 'firstname',
            type: "text",
        },
        {
            id: 2,
            txt: 'Last Name',
            htmlfor: 'lastname',
            type: "text",
        },
        {
            id: 3,
            txt: 'Email',
            htmlfor: 'email',
            type: "email",
        },
        {
            id: 4,
            txt: 'Phone',
            htmlfor: 'phone',
            type: "text",
        },
        {
            id: 5,
            txt: 'Address',
            htmlfor: 'address',
            type: "text",
        }
    ]

    const defaultValues = {
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        address: ''
    }

    const [forms, setForms] = useState(defaultValues);
    const router = useRouter();

    //Mengambil nilai inputan
    const handleChange = (e) => {
        setForms({
            ...forms,
            [e.target.name]: e.target.value
        })
    }

    //Kirim data ke database mongoDB
    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('/api/data', {
            method: 'POST',
            body: JSON.stringify(forms),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        router.push("/");
    }

    //render ke html
    return (
        <div className="flex justify-center rounded-md shadow-sm shadow-teal-200 bg-white box-content h-80 sm:w-1/2 p-4 my-36 mx-auto">
            <form className="flex flex-col p-4" onSubmit={handleSubmit}>
                {
                    inputForm.map((item) => {
                        return (
                            <div key={item.id}>
                                <input type={item.type} name={item.htmlfor} placeholder={item.txt} className="p-0.5 pl-1 shadow-[0_0px_6px] shadow-teal-800 m-3 sm:w-80" required onChange={handleChange} />
                            </div>
                        )
                    })
                }
                <button type="submit" className="bg-teal-700 w-36 m-auto mt-2 text-white rounded-md">Submit</button>
            </form>
        </div>
    );
};

export default Form;