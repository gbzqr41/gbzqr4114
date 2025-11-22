"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    businessName: "",
    businessPhone: "",
    address: "",
    fullAddress: "",
    instagram: "",
    facebook: "",
    tiktok: "",
    youtube: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(4);
    setTimeout(() => {
      router.push("/dashboard");
    }, 2000);
  };

  if (step === 4) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="text-6xl mb-4">✓</div>
          <h2 className="text-2xl font-bold text-black mb-4">Registration Successful!</h2>
          <p className="text-gray-600">Redirecting to dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-black mb-8 text-center">GBZQR</h1>
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-black">Step {step} of 3</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-black h-2 rounded-full transition-all"
              style={{ width: `${(step / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        <form onSubmit={step === 3 ? handleSubmit : (e) => { e.preventDefault(); handleNext(); }}>
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-black mb-2">
                  Full Name
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  required
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-black mb-2">
                  Phone
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-black mb-2">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  required
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label htmlFor="businessName" className="block text-sm font-medium text-black mb-2">
                  Business Name
                </label>
                <input
                  id="businessName"
                  name="businessName"
                  type="text"
                  value={formData.businessName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  required
                />
              </div>
              <div>
                <label htmlFor="businessPhone" className="block text-sm font-medium text-black mb-2">
                  Business Phone
                </label>
                <input
                  id="businessPhone"
                  name="businessPhone"
                  type="tel"
                  value={formData.businessPhone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  required
                />
              </div>
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-black mb-2">
                  Address
                </label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  required
                />
              </div>
              <div>
                <label htmlFor="fullAddress" className="block text-sm font-medium text-black mb-2">
                  Full Address
                </label>
                <input
                  id="fullAddress"
                  name="fullAddress"
                  type="text"
                  value={formData.fullAddress}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  required
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div>
                <label htmlFor="instagram" className="block text-sm font-medium text-black mb-2">
                  Instagram
                </label>
                <input
                  id="instagram"
                  name="instagram"
                  type="text"
                  value={formData.instagram}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
              <div>
                <label htmlFor="facebook" className="block text-sm font-medium text-black mb-2">
                  Facebook
                </label>
                <input
                  id="facebook"
                  name="facebook"
                  type="text"
                  value={formData.facebook}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
              <div>
                <label htmlFor="tiktok" className="block text-sm font-medium text-black mb-2">
                  TikTok
                </label>
                <input
                  id="tiktok"
                  name="tiktok"
                  type="text"
                  value={formData.tiktok}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
              <div>
                <label htmlFor="youtube" className="block text-sm font-medium text-black mb-2">
                  YouTube
                </label>
                <input
                  id="youtube"
                  name="youtube"
                  type="text"
                  value={formData.youtube}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
            </div>
          )}

          <div className="mt-6 flex gap-4">
            {step > 1 && (
              <button
                type="button"
                onClick={handleBack}
                className="flex-1 bg-gray-200 text-black py-2 px-4 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
              >
                Back
              </button>
            )}
            <button
              type="submit"
              className="flex-1 bg-black text-white py-2 px-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
            >
              {step === 3 ? "Submit" : "Next"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

