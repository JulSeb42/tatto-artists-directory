// Imports
import http from "./http-common"

class ArtistService {
    allArtists() {
        return http.get("/artists/all-artists")
    }

    getArtist(id) {
        return http.get(`/artists/artist/${id}`)
    }

    newArtist(requestBody) {
        return http.post("/artists/new-artist", requestBody)
    }

    editArtist(id, requestBody) {
        return http.put(`/artists/edit-artist/${id}`, requestBody)
    }

    deleteArtist(id) {
        return http.delete(`/artists/delete-artist/${id}`)
    }
}

export default new ArtistService()
