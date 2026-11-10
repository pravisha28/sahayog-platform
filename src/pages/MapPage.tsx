import { CommunityMap } from '@/components/CommunityMap';

export function MapPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6 pb-24 lg:pb-8">
      <h1 className="text-2xl font-extrabold text-surface-800 mb-1">Community Map</h1>
      <p className="text-sm text-surface-500 mb-6">Explore help requests, civic issues, and resources near you</p>
      <CommunityMap />
    </div>
  );
}
