"use client"; // 👈 ensures this component is client-side
import { useWaitlist } from "@/context/WaitlistContext";
import SubscribeModal from "@/components/modals/SubscribeModal";
import SuccessModal from "@/components/modals/SuccessModal";

export function ModalContainer() {
  const { 
    isSubscribeOpen, 
    closeSubscribe, 
    showSuccess, 
    isSuccessOpen, 
    successName 
  } = useWaitlist();

  return (
    <>
      {/* Subscribe modal */}
      <SubscribeModal
        open={isSubscribeOpen}
        onClose={closeSubscribe}
        onSuccess={showSuccess} // triggers success modal via context
      />

      {/* Success modal */}
      <SuccessModal 
        open={isSuccessOpen} 
        name={successName} 
      />
    </>
  );
}
