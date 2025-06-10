import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/AuthContext';
import habitService from '@/lib/habitService';
import { LeaderboardEntry } from '@/types/habit';
import { Loader2, Medal, Trophy, Award } from 'lucide-react';

// Components
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Layout } from '@/components/Layout';

const Leaderboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [userPoints, setUserPoints] = useState<number>(0);
  const [userRank, setUserRank] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        const leaderboardData = await habitService.getLeaderboard(20);
        setLeaderboard(leaderboardData);

        // Find user in leaderboard
        const userEntry = leaderboardData.find(entry => entry.user_id === user?.id);
        if (userEntry) {
          setUserPoints(userEntry.total_points);
          setUserRank(userEntry.rank);
        } else {
          // If user not in top 20, get their points separately
          const userPointsData = await habitService.getUserPoints();
          if (userPointsData) {
            setUserPoints(userPointsData.total_points);
            // User rank is beyond the top 20
            setUserRank(21);
          }
        }
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [user?.id]);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-6 w-6 text-yellow-500" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Medal className="h-6 w-6 text-amber-700" />;
      default:
        return <Award className="h-6 w-6 text-blue-500" />;
    }
  };

  const getInitials = (username: string) => {
    if (!username) return '?';
    return username.substring(0, 2).toUpperCase();
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold">Leaderboard</h1>
          <p className="text-muted-foreground">
            See how you rank against other users based on points earned from completing habits.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <>
            {/* User's stats card */}
            <Card className="border-primary/20">
              <CardHeader className="pb-2">
                <CardTitle>Your Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12 bg-primary/10 text-primary">
                      <AvatarFallback>{user?.email ? user.email.substring(0, 2).toUpperCase() : '?'}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{user?.email || 'Anonymous User'}</p>
                      <p className="text-muted-foreground text-sm">
                        Rank: {userRank ? `#${userRank}` : 'Not ranked yet'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full">
                    <Trophy className="h-5 w-5 text-primary" />
                    <span className="font-bold">{userPoints} points</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Leaderboard list */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Top Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {leaderboard.length > 0 ? (
                    leaderboard.map((entry) => (
                      <div 
                        key={entry.user_id} 
                        className={`flex items-center justify-between p-3 rounded-lg ${
                          entry.user_id === user?.id ? 'bg-primary/10' : 'hover:bg-muted'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className="flex items-center justify-center w-8">
                            {getRankIcon(entry.rank)}
                          </div>
                          <Avatar className="h-10 w-10">
                            <AvatarFallback>{getInitials(entry.username || '')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{entry.username || 'Anonymous User'}</p>
                            <p className="text-muted-foreground text-sm">Rank #{entry.rank}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 font-bold">
                          {entry.total_points} points
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      No users on the leaderboard yet. Complete habits to earn points!
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-center">
              <Button onClick={() => navigate('/dashboard')} variant="outline">
                Back to Dashboard
              </Button>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Leaderboard;