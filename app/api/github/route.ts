import { NextResponse } from "next/server";

export async function GET() {
    // Simulate network latency
    await new Promise(resolve => setTimeout(resolve, 800));

    // In a real scenario, use: fetch('https://api.github.com/graphql', { headers: { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } })
    // We're providing a rich mock because a real GitHub token is required for contribution graphs

    const mockContributions = Array.from({ length: 52 }).map(() =>
        Array.from({ length: 7 }).map(() => Math.floor(Math.random() * 10))
    );

    return NextResponse.json({
        username: "ZeroGravityDev",
        totalContributions: 1450,
        pullRequests: 84,
        stars: 231,
        heatmap: mockContributions // 52 weeks x 7 days
    });
}
