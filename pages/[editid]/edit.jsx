import { useRouter } from 'next/router';
import { useState } from 'react';

const Edit = (data) => {

    const dataForm = data.data
    
    const [form, setForm] = useState(dataForm)

    const input = [
        {
            id: 1,
            txt: 'First Name',
            htmlfor: 'firstname',
            value: form.firstname
        },
        {
            id: 2,
            txt: 'Last Name',
            htmlfor: 'lastname',
            value: form.lastname
        },
        {
            id: 3,
            txt: 'Email',
            htmlfor: 'email',
            value: form.email
        },
        {
            id: 4,
            txt: 'Phone',
            htmlfor: 'phone',
            value: form.phone
        },
        {
            id: 5,
            txt: 'Address',
            htmlfor: 'address',
            value: form.address
        }
    ]

    const router = useRouter();

    //kirim data update ke mongoDB
    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(`/api/data/${form._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form),
        });
        router.push("/")

    }

    //Ambil nilai inputan
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    //render html
    return (
        <div className="flex justify-center rounded-md shadow-sm shadow-teal-200 bg-white box-content h-80 sm:w-1/2 p-4 my-36 mx-auto">
            <form className="flex flex-col p-4" onSubmit={handleSubmit}>
                {
                    input.map((item) => {
                        return (
                            <div key={item.id}>
                                <input key={item.id} required type="text" id={item.htmlfor} name={item.htmlfor} placeholder={item.txt} value={item.value} className="p-0.5 pl-1 shadow-[0_0px_6px] shadow-teal-800 m-3 sm:w-80" onChange={handleChange} />
                            </div>
                        )
                    })
                }
                <button type="submit" className="bg-teal-700 w-36 m-auto mt-2 text-white rounded-md">Submit</button>
            </form>
        </div>
    );
};

Edit.getInitialProps = async ({ query: { editid } }) => {
    // const { paramsid } = params
    const res = await fetch(`http://localhost:3000/api/data/${editid}`);
    const data = await res.json();

    return {
        data: data,
    }
}

export default Edit;