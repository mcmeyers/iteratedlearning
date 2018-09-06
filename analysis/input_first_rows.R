library(tidyverse)
library(googlesheets)
library(glue)
library(ids)

## BASELINE CONDITIONS 

# Get the sheet's key
data_sheet <- gs_ls() %>%
  filter(sheet_title == "Kid Generations") %>%
  pull(sheet_key) %>%
  gs_key() %>%
  gs_read(ws = "Sheet1")

# Make new rows to append to sheet
x<-colnames(data_sheet)
new_data <- matrix(NA, nrow=5, ncol = 52)
colnames(new_data) <- x

new_data <- data.frame(new_data) %>%
  mutate(generation = 0, 
         seed = 1:5,
         condition = "child_baseline", #CHANGE ME 
         unique_id = random_id(5, 5),
         trial1Count = 1, trial1Display = 0,
         trial2Count = 2, trial2Display = 0.5,
         trial3Count = 2.5, trial3Display = 0.75,
         trial4Count = 4, trial4Display = 1, 
         trial5Count = 5, trial5Display = 2,
         trial6Count = 6, trial6Display = 3,
         trial7Count = 7, trial7Display = 4,
         trial8Count = 8, trial8Display = 5,
         trial9Count =9, trial9Display=6,
         data1Array = c("1 1 0 0 0 0 0 0 1 1 0 0 0 0 0 0 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 0 0 0 0 0 0 1 1 0 0 0 0 0 0 0 0"),
         data2Array = c("1 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 1 1 1"),
         data3Array = c("0 0 0 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0"),
         data4Array = c("1 1 0 1 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 1 0 0 1 0 0 0 0 1 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0"),
         data5Array = c("1 0 0 0 0 0 0 0 0 0 1 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 1 0 1 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 0 0 1 0 0 1 0 0 0 0 0"),
         data6Array = c("1 0 1 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 1 0 0 0 0 1 0 0 0 0 0 0 0 0 0 1 0 0 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 1 0"),
         data7Array = c("0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 1 0 0 0 0 1 0 0 0 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 1 1 0 0 0 0"),
         data8Array = c("0 0 1 0 0 0 0 1 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 1 0 1 0 0 0 0 0 1 1 0 0"),
         data9Array = c("1 0 0 0 0 0 1 0 1 0 0 1 0 0 1 0 0 0 0 0 0 0 0 1 1 0 0 0 0 1 0 0 0 0 0 0 0 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0"),
         available_onload = 1,
         available_accepted = 1)

# Write data
data_sheet <- gs_ls() %>%
  filter(sheet_title == "Kid Generations") %>%
  pull(sheet_key) %>%
  gs_key() %>%
  gs_add_row(ws = "Sheet1", input = new_data)


## DYAD CONDITIONS

# Get the sheet's key
data2_sheet <- gs_ls() %>%
  filter(sheet_title == "Dyad Generations") %>%
  pull(sheet_key) %>%
  gs_key() %>%
  gs_read(ws = "Sheet1")

# Make new rows to append to sheet
x<-colnames(data2_sheet)
new2_data <- matrix(NA, nrow=20, ncol = 52)
colnames(new2_data) <- x

new2_data <- data.frame(new2_data) %>%
  mutate(generation = 0, 
         seed = 1:20,
         condition = "initial", 
         unique_id = random_id(20,5),
         trial1Count = 1, trial1Display = 0,
         trial2Count = 2, trial2Display = 0.5,
         trial3Count = 2.5, trial3Display = 0.75, 
         trial4Count = 4, trial4Display = 1, 
         trial5Count = 5, trial5Display = 2,
         trial6Count = 6, trial6Display = 3,
         trial7Count = 7, trial7Display = 4,
         trial8Count = 8, trial8Display = 5,
         trial9Count =9, trial9Display=6,
         sub_age = "adult/child dyad",
         data1Array = c("1 1 0 0 0 0 0 0 1 1 0 0 0 0 0 0 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 0 0 0 0 0 0 1 1 0 0 0 0 0 0 0 0"),
         data2Array = c("1 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 1 1 1"),
         data3Array = c("0 0 0 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0"),
         data4Array = c("1 1 0 1 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 1 0 0 1 0 0 0 0 1 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0"),
         data5Array = c("1 0 0 0 0 0 0 0 0 0 1 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 1 0 1 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 0 0 1 0 0 1 0 0 0 0 0"),
         data6Array = c("1 0 1 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 1 0 0 0 0 1 0 0 0 0 0 0 0 0 0 1 0 0 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 1 0"),
         data7Array = c("0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 1 0 0 0 0 1 0 0 0 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 1 1 0 0 0 0"),
         data8Array = c("0 0 1 0 0 0 0 1 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 1 0 1 0 0 0 0 0 1 1 0 0"),
         data9Array = c("1 0 0 0 0 0 1 0 1 0 0 1 0 0 1 0 0 0 0 0 0 0 0 1 1 0 0 0 0 1 0 0 0 0 0 0 0 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0"),
         available_onload = 1,
         available_accepted = 1)

# Write data
data2_sheet <- gs_ls() %>%
  filter(sheet_title == "Dyad Generations") %>%
  pull(sheet_key) %>%
  gs_key() %>%
  gs_add_row(ws = "Sheet1", input = new2_data)
