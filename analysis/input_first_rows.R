library(tidyverse)
library(googlesheets)
library(glue)
library(ids)

# Get the sheet's key
data_sheet <- gs_ls() %>%
  filter(sheet_title == "Kid Generations") %>%
  pull(sheet_key) %>%
  gs_key() %>%
  gs_read(ws = "Sheet1")

# Make new rows to append to sheet
x<-colnames(data_sheet)
new_data <- matrix(NA, nrow=2, ncol = 50)
colnames(new_data) <- x

new_data <- data.frame(new_data) %>%
  mutate(generation = 0, 
         available = 1, 
         seed = 1:2,
         unique_id = random_id(2, 8),
         trial1Count = 1, trial1Display = 0,
         trial2Count = 2, trial2Display = 0.5,
         trial4Count = 4, trial4Display = 1, 
         trial5Count = 5, trial5Display = 2,
         trial6Count = 6, trial6Display = 3,
         trial7Count = 7, trial7Display = 4,
         trial8Count = 8, trial8Display = 5,
         trial9Count =9, trial9Display=6,
         data1Array = as.character(data_sheet[1,13]),
         data2Array = as.character(data_sheet[1,18]),
         data4Array = c("1 1 0 1 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 1 0 0 1 0 0 0 0 1 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0"),
         data5Array = c("1 0 0 0 0 0 0 0 0 0 1 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 1 0 1 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 0 0 1 0 0 1 0 0 0 0 0"),
         data6Array = c("1 0 1 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 1 0 0 0 0 1 0 0 0 0 0 0 0 0 0 1 0 0 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 1 0"),
         data7Array = c("0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 1 0 0 0 0 1 0 0 0 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 1 1 0 0 0 0"),
         data8Array = c("0 0 1 0 0 0 0 1 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 1 0 1 0 0 0 0 0 1 1 0 0"),
         data9Array = c("1 0 0 0 0 0 1 0 1 0 0 1 0 0 1 0 0 0 0 0 0 0 0 1 1 0 0 0 0 1 0 0 0 0 0 0 0 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0"))

# Write data
data_sheet <- gs_ls() %>%
  filter(sheet_title == "Kid Generations") %>%
  pull(sheet_key) %>%
  gs_key() %>%
  gs_add_row(ws = "Sheet1", input = new_data)
