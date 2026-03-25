import { NextResponse } from 'next/server';
import { renderToStream } from '@react-pdf/renderer';
import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: { flexDirection: 'column', backgroundColor: '#030712', padding: 40 },
    section: { marginVertical: 10, padding: 10, flexGrow: 0 },
    header: { fontSize: 28, color: '#f1f5f9', marginBottom: 5, fontWeight: 'bold' },
    subHeader: { fontSize: 14, color: '#64748b', marginBottom: 20 },
    highlight: { fontSize: 16, color: '#ea580c', marginTop: 20, marginBottom: 10, letterSpacing: 2 },
    text: { fontSize: 12, color: '#64748b', lineHeight: 1.5, marginBottom: 5 },
    chipContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 5, marginTop: 5 },
    chip: { padding: 4, backgroundColor: '#0f172a', color: '#f1f5f9', fontSize: 10 }
});

const ResumeDoc = () => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.section}>
                <Text style={styles.header}>Anmol Singh</Text>
                <Text style={styles.subHeader}>Zero Gravity Developer // System Architect</Text>
                <Text style={styles.text}>Based in the digital ether. Specializing in high-performance, physics-driven web applications and interactive spatial UI architectures.</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.highlight}>PROFESSIONAL TRAJECTORY</Text>
                <Text style={styles.text}>[2026] AntiGrav Labs - Software Engineer</Text>
                <Text style={styles.text}>[2025] Quantum Co - Full Stack Developer</Text>
                <Text style={styles.text}>[2024] Stellar Systems - Frontend Intern</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.highlight}>ORBITAL SYSTEMS (CORE SKILLS)</Text>
                <View style={styles.chipContainer}>
                    <Text style={styles.chip}>Next.js</Text>
                    <Text style={styles.chip}>React</Text>
                    <Text style={styles.chip}>TypeScript</Text>
                    <Text style={styles.chip}>Matter.js</Text>
                    <Text style={styles.chip}>Three.js (R3F)</Text>
                    <Text style={styles.chip}>Tailwind CSS</Text>
                    <Text style={styles.chip}>Python</Text>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.highlight}>TELEMETRY (OPEN SOURCE)</Text>
                <Text style={styles.text}>1,450+ Contributions / 84+ PRs Merged</Text>
                <Text style={styles.text}>Global DSA Ranking: Top 30% (LeetCode)</Text>
            </View>
        </Page>
    </Document>
);

export async function GET() {
    try {
        const stream = await renderToStream(<ResumeDoc />);

        // Explicitly casting the Node stream events to a Web ReadableStream
        const readableStream = new ReadableStream({
            start(controller) {
                stream.on('data', (chunk: any) => controller.enqueue(chunk));
                stream.on('end', () => controller.close());
                stream.on('error', (err: any) => controller.error(err));
            }
        });

        return new Response(readableStream, {
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': 'inline; filename="zero-gravity-resume.pdf"',
            },
        });
    } catch (error) {
        console.error("PDF generation failed:", error);
        return NextResponse.json({ error: "Failed to generate mission briefing PDF" }, { status: 500 });
    }
}
