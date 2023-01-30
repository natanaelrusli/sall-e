package handlers

import (
	"dalle-server/pkg/common/dto/requests"
	"dalle-server/pkg/common/usecases"

	"github.com/gin-gonic/gin"
)

type DalleHandler struct {
	dalleUsecase usecases.DalleUsecase
}

func NewDalleHandler(dalleUsecase usecases.DalleUsecase) *DalleHandler {
	return &DalleHandler{
		dalleUsecase: dalleUsecase,
	}
}

func (h *DalleHandler) GetDalle(ctx *gin.Context) {
	ctx.JSON(200, gin.H{
		"message": "Hello Dall-E!",
	})
}

func (h *DalleHandler) GenerateImage(c *gin.Context) {
	ctx := c.Request.Context()

	var req requests.DalleRequest
	err := c.ShouldBind(&req)
	if err != nil {
		c.JSON(500, gin.H{
			"message": "error binding request",
		})
	}

	res, err := h.dalleUsecase.GenerateImage(ctx, req)
	if err != nil {
		c.JSON(500, gin.H{
			"message": "error generating image",
			"error":   err,
		})

		return
	}

	c.JSON(200, res)
}
