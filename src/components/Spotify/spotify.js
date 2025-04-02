const clientId = '31cf919a0720447eafbed8e970469abe';
const redirectUri = "http://localhost:3000/";
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
    }
};

export default Spotify;