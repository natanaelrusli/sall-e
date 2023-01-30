package responses

type ImageData struct {
	Url string
}

type DalleResponse struct {
	Created int
	Data    []ImageData
}

type Dalle struct {
	Message string `json:"message"`
}
