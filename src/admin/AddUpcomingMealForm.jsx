import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FiUploadCloud } from 'react-icons/fi';
import { useContext, useState } from 'react';
import { AuthContext } from '../provider/AuthProvider';

const AddUpcomingMealForm = ({ onClose }) => {
    const { register, handleSubmit, reset } = useForm();
    const { user } = useContext(AuthContext);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        try {
            const formData = new FormData();
            formData.append('image', data.image[0]);

            const imgbbRes = await axios.post(
                `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMG}`,
                formData
            );
            const imageUrl = imgbbRes.data.data.url;

            const ingredientsArray = data.ingredients
                .split(',')
                .map(item => item.trim())
                .filter(Boolean);

            const mealData = {
                title: data.title,
                category: data.category,
                price: parseFloat(data.price),
                image: imageUrl,
                description: data.description,
                ingredients: ingredientsArray,
                postedBy: user?.email || "Anonymous",
                likes: 0,
            };

            await axios.post('https://meal-nest-server-inky.vercel.app/upcoming-meals', mealData);
            toast.success('✅ Upcoming meal added!');
            reset();
            onClose();
        } catch (error) {
            toast.error('❌ Failed to add meal. Try again.');
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5 p-6 bg-white rounded-lg shadow-md max-w-xl mx-auto w-full"
        >
            <h2 className="text-xl font-semibold text-gray-800 text-center">🍽 Add Upcoming Meal</h2>

            <input
                {...register('title')}
                placeholder="Meal Title"
                required
                className="input input-bordered w-full"
                disabled={isSubmitting}
            />

            <select
                {...register('category')}
                defaultValue=""
                required
                className="select select-bordered w-full"
                disabled={isSubmitting}
            >
                <option value="" disabled>Select Category</option>
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
            </select>

            <input
                {...register('price')}
                type="number"
                step="0.01"
                placeholder="Price (in BDT)"
                required
                className="input input-bordered w-full"
                disabled={isSubmitting}
            />

            <textarea
                {...register('description')}
                placeholder="Meal Description"
                required
                className="textarea textarea-bordered w-full"
                rows={3}
                disabled={isSubmitting}
            />

            <input
                {...register('ingredients')}
                placeholder="Ingredients (comma separated)"
                required
                className="input input-bordered w-full"
                disabled={isSubmitting}
            />

            <input
                value={user.email}
                readOnly
                className="input input-bordered bg-gray-100 text-gray-700 w-full"
            />

            <div>
                <label className="text-sm text-gray-600 mb-1 block">Upload Image</label>
                <div className="relative flex items-center">
                    <input
                        type="file"
                        accept="image/*"
                        {...register('image')}
                        required
                        className="file-input w-full pr-10"
                        disabled={isSubmitting}
                    />
                    <FiUploadCloud className="absolute right-3 text-gray-500 text-xl" />
                </div>
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className={`flex justify-center items-center gap-2 transition px-4 py-2 rounded w-full shadow-lg cursor-pointer 
                    ${isSubmitting
                        ? 'bg-purple-400 cursor-not-allowed text-white'
                        : 'bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white'
                    }`}
            >
                {isSubmitting ? (
                    <>
                        <span className="loading loading-spinner loading-sm"></span>
                        Adding Meal...
                    </>
                ) : (
                    <>
                        ➕ Add Meal
                    </>
                )}
            </button>
        </form>
    );
};

export default AddUpcomingMealForm;
