'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

import NominateModal from '@/components/awards/NominateModal';
import { API_BASE_URL } from '@/lib/api';

function VoteForm({ 
  awardCandidateId, 
  awardName, 
  candidateName,
  awardSlug,
  candidateSlug,
  nominationFee 
}: { 
  awardCandidateId: string; 
  awardName: string; 
  candidateName: string;
  awardSlug: string;
  candidateSlug: string;
  nominationFee?: number;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const reference = searchParams.get('reference');
    if (reference) {
      verifyPayment(reference);
    }
  }, [searchParams]);

  const verifyPayment = async (reference: string) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/nominations/verify/${reference}`);
      const data = await res.json();
      
      if (data.success) {
        setMessage('Payment successful! Your nomination has been recorded.');
        setIsSuccess(true);
      } else {
        setMessage(data.message || 'Payment verification failed.');
        setIsSuccess(false);
      }
      
      router.replace(window.location.pathname);
      router.refresh();
    } catch (error) {
      setMessage('An error occurred during verification.');
      setIsSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-bg-surface p-8 rounded-md border border-border-strong shadow-sm dark:shadow-md h-full flex flex-col justify-center">
        <h3 className="text-2xl font-bold mb-4 text-text-main">
          Support <span className="bg-linear-to-r from-primary-accent to-[#D48B25] bg-clip-text text-transparent">{candidateName}</span>
        </h3>
        <p className="text-text-muted text-lg mb-8">
          Nominate to support their campaign for the <strong className="text-text-main">{awardName}</strong>.
        </p>
        
        <button 
          onClick={() => setIsModalOpen(true)}
          disabled={loading} 
          className={`w-full py-4 text-xl font-bold rounded-md transition-all ${loading ? 'opacity-70 cursor-not-allowed bg-gray-600' : 'btn-primary'}`}
        >
          {loading ? 'Processing...' : 'Nominate Now'}
        </button>
        {message && (
          <p className={`mt-4 text-sm font-medium ${isSuccess ? 'text-green-400' : 'text-red-400'}`}>
            {message}
          </p>
        )}
      </div>

      <NominateModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        awardCandidateId={awardCandidateId}
        candidateName={candidateName}
        awardSlug={awardSlug}
        candidateSlug={candidateSlug}
        nominationFee={nominationFee}
      />
    </>
  );
}

export default function VoteSection(props: { 
  awardCandidateId: string; 
  awardName: string; 
  candidateName: string;
  awardSlug: string;
  candidateSlug: string;
  nominationFee?: number;
}) {
  return (
    <Suspense fallback={<div style={{ padding: '24px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', marginTop: '24px' }}>Loading voting section...</div>}>
      <VoteForm {...props} />
    </Suspense>
  );
}
