import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

const List = () => {
    const head = ["No", "Name", "Email", "Phone", "Address", "Action"];
    const router = useRouter();

    const [page, setPage] = useState(1);
    const [results, setResults] = useState([]);
    const [start, setStart] = useState(0);
    const [pageCount, setPageCount] = useState();

    //fungsi delete data
    const handleDelete = async (id) => {
        const response = await fetch(`http://localhost:3000/api/data/${id}`, {
            method: 'DELETE',
        });
        router.push('/')
    }


    //fetching data dari database
    useEffect(() => {
        async function getData() {
            const response = await fetch(`http://localhost:3000/api/data/page/${page}`);
            const data = await response.json()
            setResults(data.posts);
            setStart(data.start);
            setPageCount(data.pageCount);
        }
        getData();
    }, [page]);

    //handle button next page
    const handleNext = () => {
        if (page > pageCount) {
            return false
        } else (
            setPage(page + 1)
        )
    }
    const handlePrev = () => {
        if (page <= 1) {
            return false
        } else {
            setPage(page - 1);
        }
    }

    return (
        <>
            <div className='flex justify-center'>
                <Link href={`/form`}>
                    <button className="bg-teal-700 w-36 m-auto text-white rounded-md mx-auto my-10">Input data</button>
                </Link>
            </div>
            <div className='container mx-auto'>
                <table className="w-auto border border-slate-500 mx-auto relative">
                <div className='absolute left-0 -top-6'>
                    <button className="bg-teal-700 w-10 text-white rounded-md" onClick={handlePrev}>{`<`}</button>
                    <button className="bg-teal-700 w-10 text-white rounded-md" onClick={handleNext}>{`>`}</button>
                </div>
                    <thead>
                        <tr>
                            {head.map((item, i) => {
                                return <th key={i} className="px-5 border border-slate-600">{item}</th>
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {results.map((item, i) => {
                            return (
                                <tr key={item._id}>
                                    <td className="px-5 border border-slate-600">{start + i + 1}</td>
                                    <td className="px-5 border border-slate-600">{`${item.firstname}  ${item.lastname}`}</td>
                                    <td className="px-5 border border-slate-600">{item.email}</td>
                                    <td className="px-5 border border-slate-600">{item.phone}</td>
                                    <td className="px-5 border border-slate-600">{item.address}</td>
                                    <td className="px-5 border border-slate-600">
                                        <Link href={`/${item._id}/edit`}>
                                            <a>
                                                <Image className="cursor-pointer p-20" src="/edit.svg" alt="Edit Logo" width={72} height={16} />
                                            </a>
                                        </Link>
                                        <Image className="cursor-pointer" src="/delete.svg" alt="Remove Logo" width={72} height={16} onClick={() => handleDelete(item._id)} />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default List;