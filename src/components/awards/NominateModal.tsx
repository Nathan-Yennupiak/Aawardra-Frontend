'use client';
import { useState } from 'react';
import { API_BASE_URL } from '@/lib/api';

interface NominateModalProps {
  isOpen: boolean;
  onClose: () => void;
  awardCandidateId: string;
  candidateName: string;
  awardSlug: string;
  candidateSlug: string;
  nominationFee?: number;
  /** Paystack fee rate for this award's platform, from the API. */
  paystackFeePercentage?: number;
}

// Must match MAX_VOTES_PER_NOMINATION / DEFAULT_PAYSTACK_FEE_PERCENTAGE in the backend's financial.service.ts.
const MAX_VOTES = 10_000;
const DEFAULT_PAYSTACK_FEE_PERCENTAGE = 1.95;

const clampVotes = (n: number) => Math.min(MAX_VOTES, Math.max(1, n));

export default function NominateModal({ isOpen, onClose, awardCandidateId, candidateName, awardSlug, candidateSlug, nominationFee, paystackFeePercentage }: NominateModalProps) {
  const [email, setEmail] = useState('');
  const [votes, setVotes] = useState(1);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleVote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || votes < 1) return;

    setLoading(true);
    setMessage('');

    try {
      const res = await fetch(`${API_BASE_URL}/nominations/initialize`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          awardCandidateId, 
          email,
          votes,
          callbackUrl: `${window.location.origin}/awards/${awardSlug}/candidates/${candidateSlug}`
        })
      });
      const data = await res.json();

      if (data.success && data.data?.authorizationUrl) {
        window.location.href = data.data.authorizationUrl;
      } else {
        setMessage(data.message || 'Failed to initialize payment.');
        setIsSuccess(false);
      }
    } catch (error) {
      // fetch only throws when no usable response arrived: offline, server down, or blocked by CORS.
      console.error('Nomination request failed', error);
      setMessage('Could not reach the server. Check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const totalFee = (nominationFee || 10000) * votes;
  // Same gross-up the backend charges: customerPays = base / (1 - rate)
  const feeRate = (paystackFeePercentage ?? DEFAULT_PAYSTACK_FEE_PERCENTAGE) / 100;
  const customerPays = Math.round(totalFee / (1 - feeRate));

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="glass-panel w-full max-w-lg p-8 relative flex flex-col items-center text-center animate-in fade-in zoom-in-95 duration-200">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-text-muted hover:text-text-main transition-colors text-xl font-bold"
          aria-label="Close"
        >
          ✕
        </button>
        
        <h2 className="text-xl font-bold font-heading mb-2">
          Nominate <span className="bg-linear-to-r from-primary-accent to-[#D48B25] bg-clip-text text-transparent">{candidateName}</span>
        </h2>
        <p className="text-text-muted mb-6">Enter your details to proceed with your nomination.</p>
        
        {nominationFee ? (
          <div className="w-full bg-bg-subtle border border-border-strong rounded-lg p-4 mb-6 text-sm">
            <div className="flex justify-between mb-2">
              <span className="text-text-muted">Amount ({votes} {votes === 1 ? 'nomination' : 'nominations'}):</span>
              <span className="font-medium text-text-main">GHS {(totalFee / 100).toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-text-muted">Transaction fee:</span>
              <span className="font-medium text-text-main">
                GHS {((customerPays - totalFee) / 100).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between pt-2 border-t border-border-strong font-bold">
              <span className="text-text-main">Total:</span>
              <span className="text-primary-accent">
                GHS {(customerPays / 100).toFixed(2)}
              </span>
            </div>
          </div>
        ) : null}

        <form onSubmit={handleVote} className="w-full flex flex-col gap-4">
          <input 
            type="email" 
            name="email"
            autoComplete="email"
            placeholder="Your Email Address" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full bg-bg-base border border-border-strong rounded-md px-4 py-3 text-text-main placeholder-text-muted focus:outline-hidden focus:border-primary-accent shadow-inner text-lg"
          />
          <div className="flex flex-col gap-2">
            <label className="text-text-muted text-sm font-medium text-left">Number of Nominations</label>
            <div className="flex items-center justify-between bg-bg-base border border-border-strong rounded-md overflow-hidden shadow-inner h-14">
              <button
                type="button"
                onClick={() => setVotes(clampVotes(votes - 1))}
                className="h-full px-6 text-xl font-bold text-text-muted hover:text-text-main hover:bg-bg-subtle transition-colors border-r border-border-strong cursor-pointer"
              >
                −
              </button>
              <input 
                type="number" 
                min="1"
                max={MAX_VOTES}
                value={votes}
                onChange={(e) => setVotes(clampVotes(parseInt(e.target.value) || 1))}
                required
                className="w-full h-full bg-transparent text-text-main focus:outline-hidden text-2xl font-bold text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
              <button
                type="button"
                onClick={() => setVotes(clampVotes(votes + 1))}
                className="h-full px-6 text-xl font-bold text-text-muted hover:text-text-main hover:bg-bg-subtle transition-colors border-l border-border-strong cursor-pointer"
              >
                +
              </button>
            </div>
          </div>
          {message && (
            <p className={`text-sm font-medium ${isSuccess ? 'text-green-400' : 'text-red-400'}`}>
              {message}
            </p>
          )}
          <button 
            type="submit" 
            disabled={loading} 
            className={`w-full py-3 text-lg font-bold rounded-md transition-all ${loading ? 'opacity-70 cursor-not-allowed bg-gray-600' : 'btn-primary'}`}
          >
            {loading ? 'Processing...' : 'Nominate Now'}
          </button>
        </form>
      </div>
    </div>
  );
}
