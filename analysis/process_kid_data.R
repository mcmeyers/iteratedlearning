library(tidyverse)
library(googlesheets)
library(glue)

data <- read_csv("iteratedstudyresults.csv") %>%
  filter(condition == "pilotkid", sub_id != "Xx") %>%
  group_by(sub_id) %>%
  mutate(n = n()) %>%
  filter(n >= 10, n != 14) %>%
  select(sub_id:input_7_7) %>%
  mutate(available = 1)

#MAKE THE NEW SHEET
#kid_sheet <- gs_new("iterated_kids", "iterated_kids")

# Get the sheet's key
kid_sheet <- gs_ls() %>%
  filter(sheet_title == "iterated_kids") %>%
  pull(sheet_key) %>%
  gs_key() 

# Read the sheet
old_kids <- gs_read(kid_sheet, ws = "iterated_kids") %>%
  select(sub_id, time, date) %>%
  mutate(time = hms(time), date = mdy(date)) %>%
  mutate(key = paste0(sub_id, "_", time, "_", date)) %>%
  pull(key)

# Filter to just the new kids
new_kids <- data %>%
  ungroup() %>%
  mutate(date2 = mdy(date), time2 = hm(time)) %>%
  mutate(key = paste0(sub_id, "_", time2, "_", date2)) %>%
  select(-time2, -date2) %>%
  filter(!key %in% old_kids) %>%
  select(-key)


# Write data
kid_sheet %>%
  gs_add_row(ws = "iterated_kids", input = new_kids)
