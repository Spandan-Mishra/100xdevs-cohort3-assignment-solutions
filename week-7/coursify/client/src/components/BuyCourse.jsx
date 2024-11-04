import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const BuyCourse = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();

    const postData = async () => {
        try{
            const response = await axios.post(`/users/courses/${courseId}`);
            console.log(response);
        } catch(e) {
            console.log(e);
        }
    }

    useEffect(() => {
        postData();
    });

    return (
        <div className="flex justify-center">
            <h1 className="roboto-condensed-400 text-6xl">You have successfully bought this course!</h1>
            <button onClick={() => navigate("/users/courses")} className="roboto-condensed-400 text-3xl bg-violet-900 hover:bg-violet-950 p-2 mt-10 rounded-md">Go back to all courses</button>
        </div>
    )
}

export default BuyCourse