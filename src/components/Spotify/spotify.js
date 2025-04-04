const clientId = process.env.REACT_APP_SPOTIFY_API_KEY;
const redirectUri = "https://tetiankash.github.io/jammming";
let accessToken = "";




const Spotify = {
    getAccessToken() {
        if (accessToken) {
            console.log("✅ Using existing access token:", accessToken);
            return accessToken;
        }

        const urlParams = new URLSearchParams(window.location.hash.substring(1));
        const token = urlParams.get("access_token");
        const expiresIn = urlParams.get("expires_in");

        if (token) {
            accessToken = token;
            console.log("🔑 New access token received:", accessToken);

            // Automatically remove the token after it expires
            setTimeout(() => (accessToken = ""), expiresIn * 1000);
            
            // Remove token from URL
            window.history.pushState("Access Token", null, "/");
            return accessToken;
        } else {
            console.log("🔄 Redirecting to Spotify login...");
            window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
        }
    },

    async savePlaylist(playlistName, trackUris) {
        if (!playlistName || trackUris.length === 0) {
            console.error("❌ Missing playlist name or tracks");
            return;
        }

        const token = Spotify.getAccessToken();
        if (!token) {
            console.error("❌ No access token available");
            return;
        }

        const headers = { 
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json" 
        };

        try {
            // Get user ID
            console.log("🔄 Fetching user ID...");
            const userResponse = await fetch("https://api.spotify.com/v1/me", { headers });
            if (!userResponse.ok) throw new Error("Failed to get user ID");
            const userData = await userResponse.json();
            console.log("✅ User ID:", userData.id);
            
            // Create Playlist
            console.log("🔄 Creating playlist...");
            const playlistResponse = await fetch(`https://api.spotify.com/v1/users/${userData.id}/playlists`, {
                headers,
                method: "POST",
                body: JSON.stringify({ name: playlistName }),
            });

            if (!playlistResponse.ok) throw new Error("Failed to create playlist");
            const playlistData = await playlistResponse.json();
            console.log("✅ Playlist created! ID:", playlistData.id);

            // Add Tracks
            console.log("🔄 Adding tracks to playlist...");
            const addTracksResponse = await fetch(`https://api.spotify.com/v1/playlists/${playlistData.id}/tracks`, {
                headers,
                method: "POST",
                body: JSON.stringify({ uris: trackUris }),
            });

            if (!addTracksResponse.ok) throw new Error("Failed to add tracks to playlist");
            console.log("✅ Tracks added successfully!");

        } catch (error) {
            console.error("❌ Error:", error);
        }
    },

    async searchTracks(query) {
        if(!query) {
            console.error("❌ No search query provided");
            return [];
        }

        const token = this.getAccessToken();
        if(!token) {
            console.error("❌ No access token available");
            return [];
        }

        const headers = {
            Authorization: `Bearer ${token}`,
            'Content-type': 'application/json',
        };

        try {
            console.log(`🔎 Searching for "${query}"...`);
            const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${encodeURIComponent(query)}`, { headers });

            if(!response.ok) throw new Error(`Search failed: ${response.statusText}`);

            const data = await response.json();
            if (!data.tracks || !data.tracks.items) {
            throw new Error("No tracks found in response");
        }
            const tracks = data.tracks.items.map(track => ({
                    id: track.id,
                    name: track.name,
                    artist: track.artists.map(artist => artist.name).join(", "),
                    album: track.album.name,
                    uri: track.uri,
                }));

                console.log("✅ Search results:", tracks);
                return tracks;
        } catch(error) {
            console.error("❌ Search error:", error);
            return [];
        }

    },
};

export default Spotify;