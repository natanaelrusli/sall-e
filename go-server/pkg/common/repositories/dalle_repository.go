package repositories

import (
	"go.mongodb.org/mongo-driver/mongo"
)

type DalleRepository interface {
}

type dalleRepository struct {
	db *mongo.Client
}

func NewDalleRepository(db *mongo.Client) DalleRepository {
	return &dalleRepository{
		db: db,
	}
}
