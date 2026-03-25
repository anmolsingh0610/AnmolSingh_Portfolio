"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Terminal } from "lucide-react";

const contactSchema = z.object({
    name: z.string().min(2, "Identification required"),
    email: z.string().email("Invalid relay address"),
    message: z.string().min(10, "Transmission too short"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactSection() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ContactFormValues>({
        resolver: zodResolver(contactSchema),
    });

    const onSubmit = async (data: ContactFormValues) => {
        setIsSubmitting(true);
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                setIsSuccess(true);
                reset();
                setTimeout(() => setIsSuccess(false), 5000); // Reset success state after 5s
            }
        } catch (err) {
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className="w-full min-h-screen py-24 flex flex-col items-center justify-center perspective-wrapper relative z-20">
            <div className="max-w-4xl w-full px-8 md:px-24 flex flex-col gap-12">
                <motion.div
                    className="flex flex-col gap-2 text-center items-center"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                >
                    <div className="flex items-center gap-4">
                        <div className="h-px bg-rust-500 w-12"></div>
                        <Terminal size={18} className="text-rust-500" />
                        <div className="h-px bg-rust-500 w-12"></div>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-chrome-100 uppercase tracking-tighter mt-4">
                        Establish <span className="text-rust-500">Contact</span>
                    </h2>
                    <div className="text-chrome-500 font-mono text-sm tracking-widest mt-2 flex flex-col gap-2">
                        <a href="https://mail.google.com/mail/?view=cm&fs=1&to=anmolsingh8815@gmail.com" target="_blank" rel="noopener noreferrer" className="hover:text-rust-500 transition-colors">Email: anmolsingh8815@gmail.com</a>
                        <a href="tel:+918840730828" className="hover:text-rust-500 transition-colors">Phone: +91-8840730828</a>
                        <a href="https://www.linkedin.com/in/anmol0610/" target="_blank" rel="noopener noreferrer" className="hover:text-rust-500 transition-colors">LinkedIn: linkedin.com/in/anmol0610</a>
                        <a href="https://github.com/anmolsingh0610" target="_blank" rel="noopener noreferrer" className="hover:text-rust-500 transition-colors">GitHub: github.com/anmolsingh0610</a>
                    </div>
                </motion.div>

                <motion.div
                    className="glass-panel p-8 md:p-12 rounded-2xl border border-chrome-500/20 relative overflow-hidden"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                >
                    {/* Signal Wave Overlay on Success */}
                    <AnimatePresence>
                        {isSuccess && (
                            <motion.div
                                className="absolute inset-0 bg-rust-600/10 z-10 flex flex-col items-center justify-center backdrop-blur-md"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <motion.div
                                    className="w-32 h-32 rounded-full border border-rust-500 flex items-center justify-center"
                                    animate={{ scale: [1, 1.5, 2], opacity: [1, 0.5, 0] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                                >
                                    <div className="w-16 h-16 rounded-full bg-rust-500/20 flex items-center justify-center backdrop-blur-xl border border-rust-500">
                                        <Send className="text-rust-500" />
                                    </div>
                                </motion.div>
                                <p className="text-rust-500 font-mono tracking-widest uppercase mt-8 font-bold">Transmission Successful</p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 relative z-0">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-chrome-500 font-mono text-xs tracking-widest uppercase">Entity ID / Name</label>
                                <input
                                    {...register("name")}
                                    className="w-full bg-void border border-chrome-900 focus:border-rust-500 outline-none px-4 py-3 text-chrome-100 font-mono text-sm transition-colors rounded-sm"
                                    placeholder="Enter designation"
                                    disabled={isSubmitting}
                                />
                                {errors.name && <span className="text-rust-500 font-mono text-xs">{errors.name.message}</span>}
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-chrome-500 font-mono text-xs tracking-widest uppercase">Relay Address / Email</label>
                                <input
                                    {...register("email")}
                                    className="w-full bg-void border border-chrome-900 focus:border-rust-500 outline-none px-4 py-3 text-chrome-100 font-mono text-sm transition-colors rounded-sm"
                                    placeholder="name@domain.com"
                                    disabled={isSubmitting}
                                />
                                {errors.email && <span className="text-rust-500 font-mono text-xs">{errors.email.message}</span>}
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-chrome-500 font-mono text-xs tracking-widest uppercase">Payload / Message</label>
                            <textarea
                                {...register("message")}
                                className="w-full bg-void border border-chrome-900 focus:border-rust-500 outline-none px-4 py-3 text-chrome-100 font-mono text-sm min-h-[150px] resize-y transition-colors rounded-sm"
                                placeholder="Declare your intent..."
                                disabled={isSubmitting}
                            />
                            {errors.message && <span className="text-rust-500 font-mono text-xs">{errors.message.message}</span>}
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="mt-4 px-8 py-4 bg-rust-600 text-chrome-100 font-bold font-mono text-sm uppercase tracking-widest hover:bg-rust-500 transition-colors self-start lg:self-end flex items-center justify-center gap-3 disabled:opacity-50 border border-rust-500 rounded-sm"
                            data-magnetic="true"
                        >
                            {isSubmitting ? (
                                <span className="uppercase animate-pulse">Encoding...</span>
                            ) : (
                                <>
                                    <Send size={16} /> Transmit
                                </>
                            )}
                        </button>
                    </form>
                </motion.div>
            </div>
        </section>
    );
}
