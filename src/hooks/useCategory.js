//custom hook
import { useState, useEffect } from "react";
import axios from "axios";

//for dropdown menue in category(in header)
export default function useCategory() {
    const [categories, setCategories] = useState([]);

    //get cat
    const getCategories = async () => {
        try {
            const { data } = await axios.get("https://ff-backend-jojs.onrender.com/api/v1/category/get-category");
            setCategories(data?.category);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getCategories();
    }, []);

    return categories;
}