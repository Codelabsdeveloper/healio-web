import { CheckCircle, FlaskConical } from 'lucide-react';

export function PersonalizedDispensing() {
  return (
    <section className="py-20 bg-dark text-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="w-full max-w-sm mx-auto bg-white rounded-2xl p-8 text-dark shadow-2xl relative rotate-3 hover:rotate-0 transition-transform duration-500">
              <div className="text-center space-y-4">
                <div className="w-20 h-2 bg-primary mx-auto rounded-full" />
                <div className="text-left space-y-2 py-4 border-y border-gray-100">
                  <p className="text-[10px] text-gray-400 font-bold uppercase">Patient Name</p>
                  <p className="font-bold text-lg">ARJUN SHARMA</p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase pt-2">Medicine</p>
                  <p className="font-bold text-primary">Metformin Hydrochloride 500mg</p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase pt-2">Usage</p>
                  <p className="font-medium text-sm">
                    1 tablet, Twice daily (After Breakfast & Dinner)
                  </p>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center text-gray-400 text-xs">
                    QR
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-gray-400">BATCH: HM-9821</p>
                    <p className="text-[10px] text-gray-400">EXP: 12/2025</p>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 bg-secondary text-white text-xs px-3 py-1 rounded-full font-bold shadow-lg">
                PATIENT-SPECIFIC
              </div>
            </div>
            <div className="absolute -bottom-10 right-0 w-64 bg-gray-100 rounded-2xl p-6 text-dark shadow-2xl -rotate-6 hidden md:block">
              <p className="text-[10px] text-gray-400 font-bold uppercase">Medicine</p>
              <p className="font-bold text-primary">Telmisartan 40mg</p>
              <p className="text-xs text-gray-500">Daily Morning</p>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-4xl font-bold">
              First-of-its-kind Personalized Dispensing
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              Say goodbye to confusing blister strips. We dispense medicines in customized,
              patient-specific bottles. Each bottle is clearly labeled with your name, strength,
              and exact usage instructions.
            </p>
            <div className="grid grid-cols-2 gap-6 pt-4">
              {[
                'Eliminates consumption errors for elderly patients',
                'Improved adherence tracking through Meds App',
                'In-house pharmacist supervised dispensing',
                'End-to-end quality control and traceability',
              ].map((text) => (
                <div key={text} className="flex items-start gap-3">
                  <CheckCircle className="text-secondary shrink-0 mt-1 w-5 h-5" />
                  <p className="text-sm">{text}</p>
                </div>
              ))}
            </div>
            <div className="pt-6">
              <div className="bg-primary/20 border border-primary/50 p-4 rounded-xl flex items-center gap-4">
                <FlaskConical className="text-2xl text-primary w-8 h-8" />
                <div>
                  <p className="font-bold">NABL Certified Labs</p>
                  <p className="text-xs text-gray-400 italic">
                    Every batch is rigorously tested for purity and efficacy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
