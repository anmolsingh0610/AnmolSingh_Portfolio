import ProjectModal from "@/components/ui/ProjectModal";

export default async function InterceptedProjectModal({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    return <ProjectModal projectSlug={slug} />;
}
