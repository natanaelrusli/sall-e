package usecases

import (
	"bytes"
	"context"
	"dalle-server/pkg/common/config"
	"dalle-server/pkg/common/dto/requests"
	"dalle-server/pkg/common/dto/responses"
	"dalle-server/pkg/common/repositories"
	"encoding/json"
	"log"
	"net/http"
)

type DalleUsecase interface {
	GenerateImage(ctx context.Context, req requests.DalleRequest) (responses.DalleResponse, error)
}

type dalleUsecase struct {
	dalleRepository repositories.DalleRepository
}

func NewDalleUsecase(dalleRepository repositories.DalleRepository) DalleUsecase {
	return &dalleUsecase{
		dalleRepository: dalleRepository,
	}
}

func (u *dalleUsecase) GenerateImage(ctx context.Context, req requests.DalleRequest) (responses.DalleResponse, error) {
	cfg := config.InitConfig()
	var client = &http.Client{}
	var response responses.DalleResponse

	jsonBody := []byte(`{"prompt": "A programmer in the ocean"}`)

	apiKey := cfg.Application.Openai
	if apiKey == "" {
		log.Fatalln("error: missing API key")
	}

	request, err := http.NewRequest("POST", "https://api.openai.com/v1/images/generations", bytes.NewBufferString(string(jsonBody)))
	request.Header.Add("Authorization", "Bearer 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")
	request.Header.Set("Content-Type", "application/json")

	if err != nil {
		log.Fatalln(err)
	}

	res, err := client.Do(request)
	if err != nil {
		log.Fatalln(err)
	}
	defer res.Body.Close()

	err = json.NewDecoder(res.Body).Decode(&response)
	if err != nil {
		log.Fatalln(err)
	}

	return response, nil
}
