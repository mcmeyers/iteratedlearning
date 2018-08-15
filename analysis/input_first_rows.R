library(tidyverse)
library(googlesheets)
library(glue)

# Get the sheet's key
data_sheet <- gs_ls() %>%
  filter(sheet_title == "Kid Generations") %>%
  pull(sheet_key) %>%
  gs_key()# %>%
 # gs_read(ws = "Sheet1")

# Make new rows to append to sheet
x<-colnames(data_sheet)
new_data <- matrix(NA, nrow=20, ncol = 49)
colnames(new_data) <- x

new_data <- data.frame(new_data) %>%
  mutate(generation = 0, 
         available = 1, 
         seed = 1:20,
         target1Array = as.character(data_sheet[1,12]),
         target2Array = as.character(data_sheet[1,17]),
         target4Array = as.character(data_sheet[1,22]),
         target5Array = as.character(data_sheet[1,27]),
         target6Array = as.character(data_sheet[1,32]),
         target7Array = as.character(data_sheet[1,37]),
         target8Array = as.character(data_sheet[1,42]),
         target9Array = as.character(data_sheet[1,47]))

# Write data
data_sheet %>%
  gs_add_row(ws = "Sheet1", input = new_data)
