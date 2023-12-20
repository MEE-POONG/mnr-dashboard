// components/Modal.tsx
import useAxios from 'axios-hooks';
import { useRouter } from 'next/router';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { MdClose } from "react-icons/md";

interface EditNewsModalProps {
    isEditModalOpen: boolean;
    onClose: () => void;
}
const EditNewsModal: React.FC<EditNewsModalProps> = ({ isEditModalOpen, onClose }) => {
    if (!isEditModalOpen) return null;

    const router = useRouter();
    const { id } = router.query;
    const [
        { loading: updateNewsLoading, error: updateNewsError },
        executeNewsPut,
    ] = useAxios({}, { manual: true });
    const [title, settitle] = useState<string>("");
    const [subtitle, setsubtitle] = useState<string>("");
    const [detail, setdetail] = useState<string>("");
    const [date, setdate] = useState<string>("");
    const [author, setauthor] = useState<string>("");
    const [img, setimg] = useState<string>("");
    const [alertForm, setAlertForm] = useState<string>("not");
    const [inputForm, setInputForm] = useState<boolean>(false);
    const [checkBody, setCheckBody] = useState<string>("");

    const handleInputChange = (setter: any) => (event: any) => {
        const newValue = event.target.value;
        if (!isNaN(newValue) && !newValue.includes('.')) {
            setter(newValue);
        }
    };

    const [{ data: NewsData }, getNews] = useAxios({
        url: `/api/news/${id}`,
        method: "GET",
    });

    const reloadPage = () => {
        window.location.reload();
    };

    useEffect(() => {
        if (NewsData) {
            const {
                title,
                subtitle,
                detail,
                date,
                author,
                img: imageId, // Use the uploaded image ID
            } = NewsData;
            settitle(title);
            setsubtitle(subtitle);
            setdetail(detail);
            setdate(date);
            setauthor(author);
            setimg(img);
        }
    }, [NewsData]);


    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                const splittedString = base64String.split(",")[1]; // ตัดส่วน "data:image/png;base64," ออก
                setimg(splittedString);
            };
            reader.readAsDataURL(file);
        }
    };


    const handleSubmit = async (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        event.stopPropagation();
        let missingFields = [];
        if (!title) missingFields.push("NewsTitle");
        if (!subtitle) missingFields.push("NewsSubTitle");
        if (!detail) missingFields.push("NewsSubDetail");
        if (!date) missingFields.push("date");
        if (!author) missingFields.push("author");

        if (missingFields.length > 0) {
            setAlertForm("warning");
            setInputForm(true);
            setCheckBody(`กรอกข้อมูลไม่ครบ: ${missingFields.join(', ')}`);
        } else {
            try {
                setAlertForm("primary");

                const data = {
                    title,
                    subtitle,
                    detail,
                    date,
                    author,
                    // newImg,
                    /*img,*/
                };


                // Execute the update
                const response = await executeNewsPut({
                    url: "/api/news/" + id,
                    method: "PUT",
                    data
                });
                if (response && response.status === 200) {
                    setAlertForm("success");
                    setTimeout(() => {
                        // reloadPage();
                    }, 5000);
                } else {
                    setAlertForm("danger");
                    throw new Error('Failed to update data');
                }
            } catch (error) {
                setAlertForm("danger");
            }
        }
    };


    return (
        <div>
            <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center bg-black bg-opacity-25 p-2">
                <div className="bg-white p-3 md:p-6 rounded shadow-md ">
                    <div className='flex items-center justify-between'>
                        <h1 className='text-xl font-bold'>Edit News</h1>
                        <button className=" bg-blue-950 text-white p-1 rounded" onClick={onClose}>
                            <MdClose />
                        </button>
                    </div>

                    <div>
                        <div className="md:grid grid-cols-2 gap-4 my-5">
                            <div>
                                <label className="block text-sm font-medium ">ชื่อข่าว</label>
                                <input
                                    className={`mt-1 p-2 border ${inputForm && title === '' ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    type="text"
                                    value={title}
                                    onChange={(e) => {
                                        const newValue = e.target.value;
                                        if (newValue.length <= 50) {
                                            settitle(newValue);
                                        }
                                    }}
                                    placeholder="name@example.com"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">หัวข้อข่าว</label>
                                <input
                                    className={`mt-1 p-2 border ${inputForm && subtitle === '' ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    type="text"
                                    value={subtitle}
                                    onChange={(e) => setsubtitle(e.target.value)}
                                    placeholder="title2"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">วันที่</label>
                                <input
                                    className={`mt-1 p-2 border ${inputForm && date === '' ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    type="date"
                                    value={date}
                                    onChange={(e) => setdate(e.target.value)}
                                    placeholder="date"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Author</label>
                                <input
                                    className={`mt-1 p-2 border ${inputForm && author === '' ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    type="text"
                                    value={author}
                                    onChange={(e) => setauthor(e.target.value)}
                                    placeholder="author"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium">รายละเอียดข่าว</label>
                            <textarea
                                className={`mt-1 p-2 border ${inputForm && detail === '' ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                value={detail}
                                onChange={(e) => setdetail(e.target.value)}
                                placeholder="NewsSubDetail"
                                style={{ width: '100%', height: '200px' }}
                            />
                        </div>
                    </div>

                    <div className='text-end'>
                        <button
                            onClick={handleSubmit}
                            className='bg-teal-500 text-white hover:bg-teal-300 hover:text-black px-2 rounded'
                        >
                            Save
                        </button>
                    </div>


                </div>
            </div>
        </div>
    );
};

export default EditNewsModal;
