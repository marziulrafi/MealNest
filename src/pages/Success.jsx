import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import toast from 'react-hot-toast';

export default function Success() {
  const nav = useNavigate();
  const { search } = useLocation();
  const sessionId = new URLSearchParams(search).get('session_id');

  useEffect(() => {
    if (sessionId) {
      toast.success('Payment successful! Badge updated');
      setTimeout(() => nav('/profile'), 3000);
    }
  }, []);

  return <div className="text-center mt-20"><h2>✅ Thank you!</h2></div>;
}
