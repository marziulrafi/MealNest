import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FiUploadCloud } from 'react-icons/fi';

const AddUpcomingMealForm = ({ onClose }) => {
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = async (data) => {
        try {
            const form = new FormData();
            form.append('image', data.image[0]);
            const imgbbRes = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMG}`, form);
            const imageUrl = imgbbRes.data.data.url;

            const mealData = {
                title: data.title,
                image: imageUrl,
                likes: 0,
            };

            await axios.post('http://localhost:3000/upcoming-meals', mealData);
            toast.success('✅ Upcoming meal added');
            reset();
            onClose();
        } catch {
            toast.error('❌ Failed to add upcoming meal');
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <input {...register('title')} placeholder="Meal Title" required className="input input-bordered w-full" />

            <div>
                <label className="text-sm text-gray-600 mb-1 block">Upload Image</label>
                <div className="relative flex items-center">
                    <input type="file" {...register('image')} required className="file-input w-full pr-10" />
                    <FiUploadCloud className="absolute right-3 text-gray-500 text-xl" />
                </div>
            </div>

            <button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded w-full"
            >
                Add Meal
            </button>
        </form>
    );
};

export default AddUpcomingMealForm;
