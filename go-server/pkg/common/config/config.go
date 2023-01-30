package config

type Config struct {
	Application AppConfig
	Database    DBConfig
}

type AppConfig struct {
	Environment string
	Port        string
	Openai      string
}

type DBConfig struct {
	URI string
}
