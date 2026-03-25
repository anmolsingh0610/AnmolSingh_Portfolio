import ProjectModal from "@/components/ui/ProjectModal";

export default async function DirectProjectPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    return (
        <div className="min-h-screen bg-void flex items-center justify-center p-8 absolute inset-0 z-50">
            {/* If accessed directly, no background simulation context exists underlying the modal unless specified, so we fill the background */}
            <ProjectModal projectSlug={slug} />
        </div>
    );
}
