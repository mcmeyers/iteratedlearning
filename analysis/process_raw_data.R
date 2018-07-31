library(tidyverse)
library(jsonlite)

files <- list.files("../raw_data/", ".json", full.names = T)

read_data <- function(file) {
  json_data <- read_json(file)
  
  data <- json_data$answers$data$data %>%
    unlist() %>%
    map(., ~ t(str_split(.x, ",", simplify = T))) %>%
    bind_cols() %>%
    t

  data_df <- data[2:nrow(data),] %>%
    as_data_frame()

  names(data_df) <- str_trim(data[1,])
  
  data_df
}

map(files, read_data) %>%
  bind_rows() %>%
  write_csv("../data/anonymized_data.csv")