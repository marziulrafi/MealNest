import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { AuthContext } from '../provider/AuthProvider';
import toast from 'react-hot-toast';
import { FiUploadCloud } from 'react-icons/fi';

const AddMeal = () => {
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = async data => {
        setLoading(true);
        try {
            const form = new FormData();
            form.append('image', data.image[0]);

            const imgbbRes = await axios.post(
                `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMG}`,
                form
            );

            const imageUrl = imgbbRes.data.data.url;

            const mealData = {
                title: data.title,
                category: data.category,
                image: imageUrl,
                ingredients: data.ingredients,
                description: data.description,
                price: parseFloat(data.price),
                distributorName: user.displayName,
                distributorEmail: user.email,
                
            };

            await axios.post('https://meal-nest-server-inky.vercel.app/admin/meals', mealData);
            toast.success('🍽️ Meal added successfully!');
            reset();
        } catch (err) {
            console.error(err);
            toast.error('❌ Failed to add meal.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto px-6 py-10 bg-white shadow-xl rounded-lg">
            <h2 className="text-3xl font-bold text-purple-700 mb-6 text-center">🍱 Add a New Meal</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <input {...register('title')} placeholder="Meal Title" required className="input input-bordered w-full" />
                    <select {...register('category')} required className="select select-bordered w-full">
                        <option value="" disabled selected>Select Category</option>
                        <option value="Breakfast">Breakfast</option>
                        <option value="Lunch">Lunch</option>
                        <option value="Dinner">Dinner</option>
                    </select>
                </div>

                <div className="flex flex-col">
                    <label className="text-sm mb-1 text-gray-600">Upload Image</label>
                    <div className="relative flex items-center">
                        <input type="file" {...register('image')} required className="file-input w-full pr-10" />
                        <FiUploadCloud className="absolute right-3 text-gray-500 text-xl" />
                    </div>
                </div>

                <textarea {...register('ingredients')} placeholder="Ingredients (comma separated)" required className="textarea textarea-bordered w-full" rows="2" />
                <textarea {...register('description')} placeholder="Meal Description" required className="textarea textarea-bordered w-full" rows="3" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <input type="number" step="0.01" {...register('price')} placeholder="Price (e.g., 9.99)" required className="input input-bordered w-full" />
                    <input value={user.displayName} readOnly className="input input-bordered bg-gray-100 text-gray-700 w-full" />
                    <input value={user.email} readOnly className="input input-bordered bg-gray-100 text-gray-700 w-full" />
                </div>

                <button
                    type="submit"
                    className="w-full bg-purple-600 hover:bg-purple-700 transition text-white font-semibold py-2 rounded-md cursor-pointer"
                    disabled={loading}
                >
                    {loading ? 'Uploading Meal...' : 'Add Meal'}
                </button>
            </form>
        </div>
    );
};

export default AddMeal;
